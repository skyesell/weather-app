import { createAction } from "@reduxjs/toolkit";

export const deleteLocation = createAction<string>("deleteLocation");
export const checkAccessLocation = createAction<boolean>("checkLocation");
export const createLocation = createAction<{ lat: number; lon: number }>("createLocation");
