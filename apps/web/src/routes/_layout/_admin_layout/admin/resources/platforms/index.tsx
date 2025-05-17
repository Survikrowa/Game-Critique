import { createFileRoute } from "@tanstack/react-router";

import { ResourcePlatformsContent } from "@/features/admin/resources/platforms/resource_platforms_content.tsx";

export const Route = createFileRoute(
  "/_layout/_admin_layout/admin/resources/platforms/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResourcePlatformsContent />;
}
