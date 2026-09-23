"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks/auth.hook";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useVerifyDoctorAccount } from "@/hooks";

const RESEND_COOLDOWN = 120;

const VerifyAccountForm = ({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verifyPatient, isPending: verifyPending } =
    useVerifyAccount();
  const { mutate: verifyDoctor } = useVerifyDoctorAccount();

  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  });

  const handleOTP = () => {
    if (!email) return;

    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description:
              res.message || "Something went wrong. Please try again",
            type: "error",
          });
          return;
        }

        if (mode === "doctor") {
          toast.add({
            title: "Verification Successful",
            description: "An Admin will approve your account. This may take time. Please check your email in few days",
            type: "success",
          });
          router.push("/");

          return;
        }
      },
      onError: (err) => {
        toast.add({
          title: "Authorization failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please Provide The OTP We Send You in Your Email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
              />
            )}
            <FieldDescription>Resend in {resendTimer}</FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button disabled={resendTimer > 0}>Resend</Button>
        <Button type="submit" form="otp-form" disabled={verifyPending}>
          {verifyPending ? (
            <>
              <Spinner /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccountForm;
