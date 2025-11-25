"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountFormData, accountSchema } from "@/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { getDepositoTypes } from "@/lib/actions/depositotype.action";
import { useQuery } from "@tanstack/react-query";
import { Account, Customer, DepositoType } from "@/lib/types";
import { getCustomers } from "@/lib/actions/customer.action";
import { createAccount, updateAccount } from "@/lib/actions/account.action";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { useEffect } from "react";

type AccountFormProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  account?: Account;
};

const AccountForm = ({ title, description, icon, account }: AccountFormProps) => {
  const defaultValues = account
    ? {
        customerId: account.customerId || "",
        packetId: account.packetId || "",
        balance: Number(account.balance) || 0,
      }
    : {
        customerId: "",
        packetId: "",
      };

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues,
  });

  useEffect(() => {
    if (account) {
      form.reset({
        customerId: account.customerId || "",
        packetId: account.packetId || "",
        balance: Number(account.balance) || 0,
      });
    }
  }, [account, form]);

  const { data: customers = [] } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const { data: depositoTypes = [] } = useQuery({
    queryKey: ["deposito-types"],
    queryFn: getDepositoTypes,
  });

  const handleSubmitAccount: SubmitHandler<AccountFormData> = async (data) => {
    console.log({ data }, "<---client");

    try {
      if (title === "Create Account") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { balance, ...createData } = data;
        const res = await createAccount(createData);

        if (res.data) {
          form.reset();
          toast.success(res.message);
        }
      } else {
        const res = await updateAccount(account?.id as string, data);

        if (res.data) {
          form.reset();
          toast.success(res.message);
          document.getElementById("close-dialog")?.click();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save account");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {title === "Update Account" ? (
          <Button variant="outline" size="icon-sm">
            {icon}
          </Button>
        ) : (
          <Button>{icon}</Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitAccount)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {/* Customer name */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer: Customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select the customer name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deposito Type */}
            <FormField
              control={form.control}
              name="packetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposito Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a deposito type" />
                      </SelectTrigger>
                      <SelectContent>
                        {depositoTypes.map((depo: DepositoType) => (
                          <SelectItem key={depo.id} value={depo.id}>
                            {depo.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select the type of deposito.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {account && (
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(e.target.valueAsNumber)} value={field.value} />
                    </FormControl>
                    <FormDescription>Enter the balance amount</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button id="close-dialog" onClick={() => form.reset()} variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={form.formState.isSubmitting} className="disabled:opacity-50 disabled:cursor-not-allowed">
                {form.formState.isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountForm;
