"use client";

import { useTranslations } from "next-intl";
import { Button } from "~/islands/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/islands/ui/card";
import { Input } from "~/islands/ui/input";
import { Label } from "~/islands/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/islands/ui/tabs";
import { PricingTableNative } from "~/islands/popups/upgrade-my-plan";
import { BarChartBig, CreditCard, Settings, Star } from "lucide-react";
import { useState } from "react";
import PageHeader from "~/core/libs/components/PageHeader/PageHeader";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useLogoutModal } from "~/core/libs/hooks/useLogoutModal";
import { useUserData } from "~/core/libs/hooks/useUserData";
import { redirectToLogin } from "~/core/libs/router/redirectToLogin";
import type { ButtonType } from "~/core/libs/types/QuivrButton";
import { Modal } from "~/islands/ui/Modal/Modal";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";

import styles from "./page.module.scss";
import UsageDashboard from "~/islands/special/usage";

const UserPage = (): JSX.Element => {
  const { session } = useSupabase();
  const { userData } = useUserData();
  const t = useTranslations("logout");
  const {
    handleLogout,
    isLoggingOut,
    isLogoutModalOpened,
    setIsLogoutModalOpened,
  } = useLogoutModal();

  const button: ButtonType = {
    label: "Logout",
    color: "dangerous",
    onClick: () => {
      setIsLogoutModalOpened(true);
    },
    iconName: "logout",
  };

  if (!session || !userData) {
    redirectToLogin();
  }

  return (
    <>
      <Tabs defaultValue="settings" className="container">
        {/* Tabs title */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings" className="flex">
            <span className="mr-2">
              <Settings />
            </span>
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex">
            <span className="mr-2">
              <BarChartBig />
            </span>
            <span>Usage</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex">
            <span className="mr-2">
              <Star />
            </span>
            <span>Plan</span>
          </TabsTrigger>
        </TabsList>

        {/* Settings */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Books usage */}
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>
                Here you can see the statistics of book usage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <UsageDashboard />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plan */}
        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle>Subscription plans</CardTitle>
              <CardDescription>
                Manage all your billing things here. Everything in one place.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <PricingTableNative />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* <div className={styles.user_page_container}>
        <div className={styles.content_wrapper}>
          <Settings email={userData?.email || ""} />
        </div>
      </div>
      <Modal
        isOpen={isLogoutModalOpened}
        setOpen={setIsLogoutModalOpened}
        size="auto"
        CloseTrigger={<div />}
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="mb-5 text-lg font-medium">
            {t("areYouSure", { ns: "logout" })}
          </h2>
          <div className="flex items-center justify-center gap-5">
            <QuivrButton
              onClick={() => setIsLogoutModalOpened(false)}
              color="primary"
              label={t("cancel", { ns: "logout" })}
              iconName="close"
            />
            <QuivrButton
              isLoading={isLoggingOut}
              color="dangerous"
              onClick={() => void handleLogout()}
              label={t("title")}
              iconName="logout"
            />
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default UserPage;
