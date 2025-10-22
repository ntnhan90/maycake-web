"use client"
import { useForm , SubmitHandler} from "react-hook-form";
import React, { useState, ChangeEvent } from 'react';
import {Form, FormSelect, FormCheck } from 'react-bootstrap';
import CustomEditor from "@/components/ckeditor";

type FormValues = {
    name: string
    permalink:string
}

interface CheckboxItem {
  id: string;
  label: string;
  value: string;
}

type Props = {
  id?: number;
}

const BlogForm = (props?: Props) =>{
    const id = props?.id
    console.log(id);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
    
    const initialItems: CheckboxItem[] = [
        { id: 'item1', label: 'Option 1', value: 'option1' },
        { id: 'item2', label: 'Option 2', value: 'option2' },
        { id: 'item3', label: 'Option 3', value: 'option3' },
    ];
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedValues((prev) => [...prev, value]);
        } else {
            setSelectedValues((prev) => prev.filter((item) => item !== value));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-9 col-12">
                    <div className="card">
                        <div className="card-body">
                            <Form.Group className="mb-3">
                                <label className="form-label" >Name</label>
                                <input type="text" className="form-control" placeholder="Enter Name" 
                                    {...register("name", { required: "This field is required" })}
                                />

                                {errors.name && (
                                    <p className="form-error">{errors.name.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <label className="form-label" >Permalink</label>
                                <input type="text" className="form-control" placeholder="Enter Permalink" 
                                    {...register("permalink", { required: "This field is required" })}
                                />
                                <small className="text-truncate">Preview:</small>
                                {errors.name && (
                                    <p className="form-error">{errors.name.message}</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <label className="form-label" >Description</label>
                                <textarea placeholder="Short description" className="form-control">

                                </textarea>
                               
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <label className="form-label" >Content</label>
                                <CustomEditor />
                            </Form.Group>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Publish</h4>
                        </div>
                        <div className="card-body">
                            <div className="btn-list">
                                <button className="btn btn-primary" type="submit" value="apply" name="submitter">
                                    Save
                                </button>
                                <button className="btn" type="submit" name="submitter" value="save">
                                    Save &amp; Exit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card meta-boxes">
                        <div className="card-header">
                            <h4 className="card-title ">
                                <label className="form-label form-label fw-semibold">
                                    Status <span className="text-danger">*</span>
                                </label>
                            </h4>
                        </div>
                            
                        <div className="card-body">
                            <FormSelect aria-label="Default select example">
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="pending">Pending</option>
                            </FormSelect>
                        </div>
                    </div>

                    <div className="card meta-boxes">
                        <div className="card-header">
                            <h4 className="card-title">
                                <label className="form-label form-label fw-semibold">
                                    Categories 
                                </label>
                            </h4>
                        </div>
                         <div className="card-body">
                            {initialItems.map((item) => (
                                <FormCheck
                                    key={item.id}
                                    type="checkbox"
                                    id={item.id}
                                    label={item.label}
                                    value={item.value}
                                    checked={selectedValues.includes(item.value)}
                                    onChange={handleCheckboxChange}
                                />
                                ))}
                        </div>
                    </div>

                    <div className="card meta-boxes">
                        <div className="card-header">
                            <h4 className="card-title ">
                                <label className="form-label form-label fw-semibold">
                                    Tags 
                                </label>
                            </h4>
                            
                        </div>
                        <div className="card-body">
                            <input className="form-control" placeholder="Write some tags"/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default BlogForm;