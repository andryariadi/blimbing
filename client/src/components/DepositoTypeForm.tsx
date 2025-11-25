"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DepositoTypeFormData, depositoTypeSchema } from "@/lib/validations";
import { toast } from "react-toastify";
import { DepositoType } from "@/lib/types";
import { useEffect } from "react";
import { createDepositoType, updateDepositoType } from "@/lib/actions/depositotype.action";

type DepositoTypeFormProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  depositoType?: DepositoType;
};

const DepositoTyperForm = ({ title, description, icon, depositoType }: DepositoTypeFormProps) => {
  const form = useForm<DepositoTypeFormData>({
    resolver: zodResolver(depositoTypeSchema),
    defaultValues: {
      name: depositoType?.name || "",
      yearlyReturn: Number(depositoType?.yearlyReturn) || 0,
    },
  });

  useEffect(() => {
    if (depositoType) {
      form.reset({
        name: depositoType.name || "",
        yearlyReturn: Number(depositoType.yearlyReturn) || 0,
      });
    }
  }, [depositoType, form]);

  const handleSubmitDepositoType: SubmitHandler<DepositoTypeFormData> = async (data) => {
    console.log({ data });

    try {
      if (title === "Create Deposito Type") {
        const res = await createDepositoType(data);

        if (res.data) {
          form.reset();
          toast.success(res.message);
        }
      } else {
        const res = await updateDepositoType(depositoType?.id as string, data);

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
        {title === "Update Deposito Type" ? (
          <Button variant="outline" size="icon-sm">
            {icon}
          </Button>
        ) : (
          <Button>{icon}</Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitDepositoType)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposito Type Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter the deposito type name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Yearly Return */}
            <FormField
              control={form.control}
              name="yearlyReturn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yearly Return</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={(e) => field.onChange(e.target.valueAsNumber)} value={field.value} />
                  </FormControl>
                  <FormDescription>Enter the yearly return</FormDescription>
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
export default DepositoTyperForm;
