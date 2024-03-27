const BASE_URL=import.meta.env.VITE_BASE_URL

export const endPoints={
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword"
}


export const profileEndPoints={
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteAccount"
}


export const courseEndPoints={
    /* COURSE API */
    GET_ALL_COURSE_API: BASE_URL + "/course/showAllCourses",
    GET_COURSE_DETAILS_API: BASE_URL +"/course/getCourseDetails",
    CREATE_COURSE_API: BASE_URL +"/course/createCourse",

    /* SECTION API */
    CREATE_SECTION_API: BASE_URL +"/course/createSection",
    UPDATE_SECTION_API: BASE_URL +"/course/updateSection",
    DELETE_SECTION_API: BASE_URL +"/course/deleteSection",

    /* SUB SECTION API */
    CREATE_SUBSECTION_API: BASE_URL +"/course/createSubSection",
    UPDATE_SUBSECTION_API: BASE_URL +"/course/updateSubSection",
    DELETE_SUBSECTION_API: BASE_URL +"/course/deleteSubSection",

    /* CATEGORY API */
    GET_ALL_CATEGORY_API: BASE_URL +"/course/getAllCategory",
    CREATE_CATEGORY_API: BASE_URL +"/course/createCategory",
    GET_CATEGORY_PAGE_DETAIL_API: BASE_URL +"/course/categoryPageDetails",

    /* RATING AND REVIEW API */
    CREATE_RATING_API: BASE_URL +"/course/createRating",
    GET_AVARAGE_RATING_API: BASE_URL +"/course/getAvarageRating",
    GET_ALL_RATINGS_API: BASE_URL +"/course/getAllRatings"

}

export const catalogData= {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getAllCategory",
}
