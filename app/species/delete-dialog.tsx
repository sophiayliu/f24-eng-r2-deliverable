"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import type { Database } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Species = Database["public"]["Tables"]["species"]["Row"];

// allow users to delete species that they added (button only appears on species card for species the user created)

export default function DeleteDialog({ species }: { species: Species }) {
  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);
  console.log(species);
  // Instantiate form functionality with React Hook Form, passing in the Zod schema (for validation) and default values
  console.log("hooray");

  const router = useRouter();

  const deleteClick = async () => {
    console.log("DONE");
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("species").delete().eq("id", species.id); // delete species

    if (error) {
      console.log("oh no");
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-1 mr-1 flex-auto">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogClose asChild>
          <Button variant="default" className="ml-1 mr-1 flex-auto" onClick={() => void deleteClick()}>
            Confirm
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
