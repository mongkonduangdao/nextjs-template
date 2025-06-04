"use client";

import { useGetMe } from "@/shared/hooks/api/v1/me/useGetMe";

export default function HomePage() {
  const { data } = useGetMe();
  return <div>{data?.user.email}</div>;
}