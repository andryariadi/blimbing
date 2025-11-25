"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader, UserRoundPlus } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerFormData, customerSchema } from "@/lib/validations";
import { createCustomer, updateCustomer } from "@/lib/actions/customer.action";
import { toast } from "react-toastify";
import { Customer } from "@/lib/types";

type CustomerFormProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  customer?: Customer;
};

const CustomerForm = ({ title, description, icon, customer }: CustomerFormProps) => {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer?.name || "",
    },
  });

  const handleSubmitUser: SubmitHandler<CustomerFormData> = async (data) => {
    console.log({ data });

    try {
      if (title === "Create Customer") {
        const res = await createCustomer(data);

        if (res.data) {
          form.reset();
          toast.success(res.message);
        }
      } else {
        const res = await updateCustomer(customer?.id as string, data.name);

        if (res.data) {
          form.reset();
          toast.success(res.message);
          document.getElementById("close-dialog")?.click();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {title === "Update Customer" ? (
          <Button variant="outline" size="icon-sm">
            {icon}
          </Button>
        ) : (
          <Button>{icon}</Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitUser)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {/* Firstname */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button id="close-dialog" onClick={() => form.reset()} variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={form.formState.isSubmitting} className="disabled:opacity-50 disabled:cursor-not-allowed">
                {form.formState.isSubmitting ? <Loader scale={22} className="animate-spin mx-auto" /> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CustomerForm;
