"use client";

import React from "react";

export default function Page({ params }: any) {
  return (
    <>
        <h1>
          Profile
          {params.id}
        </h1>
    </>
  );
}
