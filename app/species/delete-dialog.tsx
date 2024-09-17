"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import type { Database } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function DeleteDialog({ species }: { species: Species }) {
  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);
  console.log(species);
  // Instantiate form functionality with React Hook Form, passing in the Zod schema (for validation) and default values
  const form = useForm<FormData>({
    // resolver: zodResolver(speciesSchema),
    // defaultValues,
    //  mode: "onChange",
  });

  const handleClick = () => {
    // Code to execute when the button is clicked
    console.log("Button clicked!");
  };

  const deleteClick = async () => {
    // Code to execute when the button is clicked
    const supabase = createBrowserSupabaseClient();

    const { error } = await supabase.from("species").delete().eq("id", species.id);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-1 mr-1 flex-auto" onClick={handleClick}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <button onClick={handleClick}>Confirm Delete</button>
        </DialogHeader>
        <Form {...form}>Are you sure you want to delete</Form>
        <DialogClose asChild>
          <Button variant="default" className="ml-1 mr-1 flex-auto" onClick={void deleteClick}>
            Confirm
          </Button>
          <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
