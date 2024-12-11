/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as LayoutImport } from "./routes/_layout";
import { Route as LayoutIndexImport } from "./routes/_layout/index";
import { Route as LayoutAdminlayoutImport } from "./routes/_layout/_admin_layout";
import { Route as LayoutAdminlayoutAdminIndexImport } from "./routes/_layout/_admin_layout/admin/index";
import { Route as LayoutAdminlayoutAdminUsersIndexImport } from "./routes/_layout/_admin_layout/admin/users/index";

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: "/_layout",
  getParentRoute: () => rootRoute,
} as any);

const LayoutIndexRoute = LayoutIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutAdminlayoutRoute = LayoutAdminlayoutImport.update({
  id: "/_admin_layout",
  getParentRoute: () => LayoutRoute,
} as any);

const LayoutAdminlayoutAdminIndexRoute =
  LayoutAdminlayoutAdminIndexImport.update({
    id: "/admin/",
    path: "/admin/",
    getParentRoute: () => LayoutAdminlayoutRoute,
  } as any);

const LayoutAdminlayoutAdminUsersIndexRoute =
  LayoutAdminlayoutAdminUsersIndexImport.update({
    id: "/admin/users/",
    path: "/admin/users/",
    getParentRoute: () => LayoutAdminlayoutRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_layout": {
      id: "/_layout";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof LayoutImport;
      parentRoute: typeof rootRoute;
    };
    "/_layout/_admin_layout": {
      id: "/_layout/_admin_layout";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof LayoutAdminlayoutImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/": {
      id: "/_layout/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof LayoutIndexImport;
      parentRoute: typeof LayoutImport;
    };
    "/_layout/_admin_layout/admin/": {
      id: "/_layout/_admin_layout/admin/";
      path: "/admin";
      fullPath: "/admin";
      preLoaderRoute: typeof LayoutAdminlayoutAdminIndexImport;
      parentRoute: typeof LayoutAdminlayoutImport;
    };
    "/_layout/_admin_layout/admin/users/": {
      id: "/_layout/_admin_layout/admin/users/";
      path: "/admin/users";
      fullPath: "/admin/users";
      preLoaderRoute: typeof LayoutAdminlayoutAdminUsersIndexImport;
      parentRoute: typeof LayoutAdminlayoutImport;
    };
  }
}

// Create and export the route tree

interface LayoutAdminlayoutRouteChildren {
  LayoutAdminlayoutAdminIndexRoute: typeof LayoutAdminlayoutAdminIndexRoute;
  LayoutAdminlayoutAdminUsersIndexRoute: typeof LayoutAdminlayoutAdminUsersIndexRoute;
}

const LayoutAdminlayoutRouteChildren: LayoutAdminlayoutRouteChildren = {
  LayoutAdminlayoutAdminIndexRoute: LayoutAdminlayoutAdminIndexRoute,
  LayoutAdminlayoutAdminUsersIndexRoute: LayoutAdminlayoutAdminUsersIndexRoute,
};

const LayoutAdminlayoutRouteWithChildren =
  LayoutAdminlayoutRoute._addFileChildren(LayoutAdminlayoutRouteChildren);

interface LayoutRouteChildren {
  LayoutAdminlayoutRoute: typeof LayoutAdminlayoutRouteWithChildren;
  LayoutIndexRoute: typeof LayoutIndexRoute;
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutAdminlayoutRoute: LayoutAdminlayoutRouteWithChildren,
  LayoutIndexRoute: LayoutIndexRoute,
};

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren);

export interface FileRoutesByFullPath {
  "": typeof LayoutAdminlayoutRouteWithChildren;
  "/": typeof LayoutIndexRoute;
  "/admin": typeof LayoutAdminlayoutAdminIndexRoute;
  "/admin/users": typeof LayoutAdminlayoutAdminUsersIndexRoute;
}

export interface FileRoutesByTo {
  "": typeof LayoutAdminlayoutRouteWithChildren;
  "/": typeof LayoutIndexRoute;
  "/admin": typeof LayoutAdminlayoutAdminIndexRoute;
  "/admin/users": typeof LayoutAdminlayoutAdminUsersIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/_layout": typeof LayoutRouteWithChildren;
  "/_layout/_admin_layout": typeof LayoutAdminlayoutRouteWithChildren;
  "/_layout/": typeof LayoutIndexRoute;
  "/_layout/_admin_layout/admin/": typeof LayoutAdminlayoutAdminIndexRoute;
  "/_layout/_admin_layout/admin/users/": typeof LayoutAdminlayoutAdminUsersIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "" | "/" | "/admin" | "/admin/users";
  fileRoutesByTo: FileRoutesByTo;
  to: "" | "/" | "/admin" | "/admin/users";
  id:
    | "__root__"
    | "/_layout"
    | "/_layout/_admin_layout"
    | "/_layout/"
    | "/_layout/_admin_layout/admin/"
    | "/_layout/_admin_layout/admin/users/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/_admin_layout",
        "/_layout/"
      ]
    },
    "/_layout/_admin_layout": {
      "filePath": "_layout/_admin_layout.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_admin_layout/admin/",
        "/_layout/_admin_layout/admin/users/"
      ]
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/_admin_layout/admin/": {
      "filePath": "_layout/_admin_layout/admin/index.tsx",
      "parent": "/_layout/_admin_layout"
    },
    "/_layout/_admin_layout/admin/users/": {
      "filePath": "_layout/_admin_layout/admin/users/index.tsx",
      "parent": "/_layout/_admin_layout"
    }
  }
}
ROUTE_MANIFEST_END */
