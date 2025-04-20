"use client";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { createCategoryAction } from "../actions";
import { Category } from "@/prisma/generated/prisma";

const AddCategoryModal = ({
  setCategoriesData,
}: {
  setCategoriesData: React.Dispatch<React.SetStateAction<Category[]>>;
}) => {
  const [newCategory, setNewCategory] = React.useState("");
  const [order, setOrder] = React.useState("");
  const handleAddCategory = async () => {
    createCategoryAction(newCategory, parseInt(order)).then((response) => {
      if (!response.success) {
        toast.error("Failed to create category", {
          style: { color: "red" },
        });
        return;
      }
      if (response.data) {
        setCategoriesData((prevState) => [...prevState, response.data]);
        toast.success("Category created successfully", {
          style: { color: "green" },
        });
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm">+ Add new category</AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Cateogry</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              type="text"
              placeholder="Category Name"
              className="input-field mt-3"
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Category Order"
              className="input-field mt-3"
              onChange={(e) => setOrder(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddCategory}>Add</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCategoryModal;
