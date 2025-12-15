"use client"
import { CreateProTagBodyType, CreateProTagBody } from "@/models/product/tagModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateTaxMutation, useGetTaxQuery, useUpdateTaxMutation } from "@/queries/useTax";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";