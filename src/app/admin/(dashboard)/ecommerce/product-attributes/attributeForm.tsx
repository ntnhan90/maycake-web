"use client"
import { CreateAttributeSetBody, CreateAttributeSetBodyType } from "@/models/product/attributeModel";
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateProductAttributeMutation, useGetProductAttributeQuery, useUpdateProductAttributeMutation } from '@/queries/useProductAttribute';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { Trash } from 'react-bootstrap-icons'
import ImageUploadBoxMini from "@/components/Image/ImageUploadBoxMini";

type Props ={
  id?: number
}

export default function ProAttributeForm({id}: Props){
  const router = useRouter()
  const createAttributeMutation = useCreateProductAttributeMutation();
  const updateAttributeMutation = useUpdateProductAttributeMutation();

  const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
        setError
  } = useForm<CreateAttributeSetBodyType>({
    resolver: zodResolver(CreateAttributeSetBody),
      defaultValues: {
        name: "",
        status:"published",
        attributes: [
          {   
            title: '',
            color: '#333333',
            image: null,
            price: 0,
          },
        ],
      },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  })

  const attributeId = id ? Number(id) : 0;
    const attributeQuery = useGetProductAttributeQuery(attributeId);
    const attributeData = id ? attributeQuery.data?.payload : null;

    useEffect(() => {
      if (!attributeData) return;

      reset({
        name: attributeData.name ?? "",
        status: attributeData.status?? "",
        attributes: attributeData.attributes
          .map(attr => ({
            attribute_id: attr.attribute_id,
            title: attr.title,
            color: attr.color ?? "#000000",
            image: attr.image ?? null,
            price: attr.price == null ? 0: Number(attr.price),
          })),
      });
    }, [attributeData, reset]);

    const onSubmit = async(data:CreateAttributeSetBodyType) => {
      console.log("Submit data:", JSON.stringify(data, null, 2));
      try {
        let body = data;
        if (id) {
          await updateAttributeMutation.mutateAsync({
            id,
            ...body,
          });
          toast.success("Update success");
        } else {
          await createAttributeMutation.mutateAsync(body);
          toast.success("Create success");
        }
      } catch (error) {
        handleErrorApi({
          error,
          setError:setError
        })
      }
      //router.push("/admin/ecommerce/product-attributes")
    }

    return(
      <form onSubmit={handleSubmit(onSubmit, (err) =>{
          console.log(err)
        })} className="row">
        <div className="col-md-9">
            <Card>
              <CardBody>
                <div className="mb-3 position-relative">
                  <label className="form-label form-label" htmlFor="first_name">
                    Name <span className="text-red-500">*</span>
                  </label> 
                  <input className="form-control " placeholder="Enter name"  {...register("name")} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
              </CardBody>
            </Card>
            <Card className='mt-3'>
              <CardHeader className='d-flex justify-content-between'>
                <strong>Attributes list</strong>
                  *   <Button size="sm"  type="button" onClick={() =>
                            append({
                                title: '',
                                color: '#333333',
                                image: null,
                                price: 0.00
                            })
                        }>
                            Add new attribute
                  </Button>
              </CardHeader>
                    
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr> 
                      <th>#</th>
                      <th>Title</th>
                      <th>Color</th>
                      <th>Image</th>
                      <th>Group</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => {
                      const image = watch(`attributes.${index}.image`)
                      return(
                        <tr key={field.id}>
                          <td>
                            <input
                              type="hidden"
                              {...register(`attributes.${index}.attribute_id`)}
                            />
                            {index + 1}
                            </td>
                          <td>
                            <Form.Control {...register(  `attributes.${index}.title`  )}
                                isInvalid={ !!errors.attributes?.[index]?.title }
                            />
                            <Form.Control.Feedback type="invalid">
                              { errors.attributes?.[index]?.title?.message }
                            </Form.Control.Feedback>
                          </td>
                          <td>
                            <Form.Control type="color" {...register(`attributes.${index}.color`)}
                              style={{ width: 60, height: 38 }}
                            />
                          </td>
                          <td>
                            <div className="d-flex flex-column gap-2">
                              <ImageUploadBoxMini name={`attributes.${index}.image`} control={control}  />
                            </div>
                          </td>
                          <td>
                            Group
                          </td>
                          <td>
                            <Form.Control type="number" step="0.01"
                              {...register(`attributes.${index}.price`, {valueAsNumber: true, })}
                              isInvalid={!!errors.attributes?.[index]?.price}
                            />
                              <Form.Control.Feedback type="invalid">
                                {errors.attributes?.[index]?.price?.message}
                              </Form.Control.Feedback>
                          </td>
                          <td>
                            <Button variant="link"  className="text-danger" onClick={() => remove(index)} >
                              <Trash />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
        </div>
        <div className="col-md-3">
          <Card >
            <CardHeader>
              <h5 className="card-title">Puslish</h5>
            </CardHeader>
            <CardBody>
              <div className="btn-list">
                <Button variant="primary" type="submit">Save</Button>
              </div>
            </CardBody>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <h5 className="card-title">Status
                <span className="text-red-500">*</span>
              </h5>
            </CardHeader>
            <CardBody>
              <Form.Select aria-label="Default select example" {...register("status")} >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
              </Form.Select>
            </CardBody>
          </Card>
        </div>
      </form>
    )
}