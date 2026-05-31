"use client";

import { useState } from "react";

export function useHeader(defaultActive: string) {
  const [active, setActive] = useState(defaultActive);

  return { active, setActive };
}
