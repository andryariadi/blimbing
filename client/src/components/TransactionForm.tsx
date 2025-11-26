"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, Loader } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionFormData, transactionSchema } from "@/lib/validations";
import { Account } from "@/lib/types";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { createDeposit, createWithdraw } from "@/lib/actions/transaction.action";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { formatDisplayDate } from "@/lib/utils";

type AccountFormProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  account?: Account;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return formatDisplayDate(date);
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

const TransactionForm = ({ title, description, icon, account }: AccountFormProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      accountId: account?.id,
      amount: 0,
      transactionDate: new Date(),
    },
  });

  const handleSubmitTransaction: SubmitHandler<TransactionFormData> = async (data) => {
    try {
      if (title === "Deposit") {
        const res = await createDeposit(data);
        if (res.data) {
          resetForm();
          toast.success(res.message);
          document.getElementById("close-dialog")?.click();
        }
      } else {
        const res = await createWithdraw(data);
        if (res.data) {
          resetForm();
          toast.success(res.message);
          document.getElementById("close-dialog")?.click();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save transaction");
    }
  };

  const resetForm = () => {
    const today = new Date();
    form.reset();
    setDate(today);
    setMonth(today);
    setValue(formatDate(today));
  };

  const handleCancel = () => {
    resetForm();
    document.getElementById("close-dialog")?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {title === "Withdraw" ? (
          <Button variant="outline">
            Withdraw
            {icon}
          </Button>
        ) : (
          <Button>
            Deposit
            {icon}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitTransaction)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
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

            {/* Transaction Date */}
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Date</FormLabel>
                  <FormControl>
                    <div className="relative flex gap-2">
                      <Input
                        id="date"
                        value={value}
                        placeholder={new Date().toDateString()}
                        className="bg-background pr-10"
                        onChange={(e) => {
                          const newDate = new Date(e.target.value);
                          setValue(e.target.value);
                          if (isValidDate(newDate)) {
                            setDate(newDate);
                            setMonth(newDate);
                            field.onChange(newDate);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setOpen(true);
                          }
                        }}
                      />
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(selectedDate) => {
                              if (selectedDate) {
                                setDate(selectedDate);
                                setValue(formatDate(selectedDate));
                                field.onChange(selectedDate);
                                setOpen(false);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormDescription>Enter the transaction date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button id="close-dialog" onClick={handleCancel} variant="outline">
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

export default TransactionForm;
