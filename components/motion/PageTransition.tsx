/// <reference types="react/canary" />
import { ViewTransition } from "react";

// React runs enter and exit only when the boundary sits above every DOM node of the page.
export default function PageTransition({
  persist = false,
  children,
}: {
  persist?: boolean;
  children: React.ReactNode;
}) {
  return persist ? (
    <ViewTransition update="page-swap" default="none">
      {children}
    </ViewTransition>
  ) : (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
