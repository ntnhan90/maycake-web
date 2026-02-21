"use client"
import { CreatePostBodyType, CreatePostBody } from "@/models/blog/postModel";
import { useForm , Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateBlogPostMutation, useGetBlogPostQuery, useUpdateBlogPostMutation } from "@/queries/useBlogPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import SlugInput from "@/components/input/slugInput";
import FeatureToggle from "@/components/input/FeatureToggle";
import ImageUploadBox from "@/components/Image/ImageUploadBox";
import TagInput from "@/components/input/tagInput";
import CategorySelect from "@/components/input/categorySelect";

type Props = {
    id? : number
}