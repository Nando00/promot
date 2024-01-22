"use client";
import React from "react";
import Link from "next/link";
import registerschema from "@/lib/registerschema";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"

export default function Form() {
  const theSubmit = async (data: FieldValues) => {
    // in here we will do whatever with the data taht is submitted
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset()
  }

  const {
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
    reset
  } = useForm({
    // in here we connect the zod schema in the resolver we need that resolver in order for this to work
    resolver: zodResolver(registerschema)
  })

  return (
    <>
    {/* in here we connect the submit to the handler by reacthookform */}
    <form onSubmit={handleSubmit(theSubmit)} className="flex flex-col gap-y-4" action="">
      <label htmlFor="">Email</label>
      <input 
      className="rounded h-8"
      // we must register each input for react hook form
      {...register("email")}
      type="email" />

      <label htmlFor="">Password</label>
      <input {...register("password")}type="password" className="rounded h-8"/>
      {errors.password && <p className="text-red">{`${errors.password.message}`}</p>}
      <label htmlFor="">Confirm Password</label>
      <input {...register("confirmPassword")}type="password" className="rounded h-8"/>
      {errors.confirmPassword && <p className="text-red">{`${errors.confirmPassword.message}`}</p>}

      <button  type="submit" className="rounded w-full bg-black h-9">
        Submit
      </button>
    </form>
    </>
  );
}

