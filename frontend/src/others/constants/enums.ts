//globally used :
export enum EFetchStatus {
  NONE = "none",
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}

export enum NavbarPageModeEnum {
  CHECKOUT = "checkout",
  HOME = "home",
} // <= sizes can be accessed in setup scope

export type TNavbarPageMode = "checkout" | "home"

export enum ECentreInfoKey {
  NONE = "",
  OPENING_HOURS = "opening-hours",
  PRICING = "pricing",
  LAYOUT = "layout",
  POLICY = "policy",
}
