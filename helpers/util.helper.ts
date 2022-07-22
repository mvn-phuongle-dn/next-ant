import _ from "lodash";

/**
 * Check if a string looks like an external URL
 */
export const isURL = (str: string) => {
  return /http|www/.test(str);
};

/**
 * Scroll to top of screen smoothly,
 * or fallback to instant scroll to top
 */
export const scrollToTop = () => {
  if (typeof window !== "undefined") {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      // fallback for older browsers
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    }
  }
};

export const isTouchScreen = () => {
  if (typeof window !== "undefined") {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  return false;
};

export const formatApiErrorResponse = (errorResponse: any) => {
  return (
    _.get(errorResponse, "response.data") || {
      error: {
        details: {
          message: "Something went wrong, please try again later.",
        },
      },
    }
  );
};
