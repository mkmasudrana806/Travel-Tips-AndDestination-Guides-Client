import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

// ---------- change password form component
const ChangePasswordForm = () => {
  // --------------- redux
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();

  // --------------- react
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  // ----------- handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // ----------------- validte form data
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!passwords.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!passwords.newPassword)
      newErrors.newPassword = "New password is required";
    if (passwords.newPassword !== passwords.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------- handle submit password change form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const newPasswordData = {
        oldPassword: passwords?.currentPassword,
        newPassword: passwords?.newPassword,
      };

      const result = await changePassword(newPasswordData).unwrap();
      if (result?.success) {
        setSuccessMessage("Password changed successfully!");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccessMessage(""), 2000);
        dispatch(logout());
        router.push("/login");
      }
    } catch (error: any) {
      setErrors({ form: error?.data?.message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Ensure your account is using a strong password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div className="space-y-2">
            {/* current password  */}
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
            {errors?.currentPassword && (
              <p className="text-sm text-destructive">
                {errors?.currentPassword}
              </p>
            )}
          </div>

          {/* new password  */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
            {errors?.newPassword && (
              <p className="text-sm text-destructive">{errors?.newPassword}</p>
            )}
          </div>

          {/* confirm password  */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />
            {errors?.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors?.confirmPassword}
              </p>
            )}
          </div>
          <Button type="submit">Change Password</Button>
        </form>
      </CardContent>

      {successMessage && (
        <Alert
          variant="default"
          className="mt-4 bg-green-50 text-green-800 border-green-300"
        >
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errors?.form && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors?.form}</AlertDescription>
        </Alert>
      )}
    </Card>
  );
};

export default ChangePasswordForm;
