import { useFormikContext } from "formik"
import React, { useContext } from "react"
import { View } from "react-native"

import AppText from "../../AppText"
import Screen from "../../Screen"
import SubAppPicker from "./SubAppPicker"
import AuthContext from "../../../auth/appContext"
import subCategories from "../../../config/subCategories"

const SupAppFormPicker = ({ name, placeholder, width }) => {
  const { setFieldValue, values } = useFormikContext()
  const { subCategory } = useContext(AuthContext)

  //   Find and filter
  const subCategoriesList = subCategories.find(
    (item) => item.value === subCategory
  )
  return (
    <>
      <SubAppPicker
        items={subCategoriesList}
        placeholder={placeholder}
        width={width}
        setSelectedValue={(item) => setFieldValue(name, item)}
        selectedValue={values[name]}
      />
    </>
  )
}

export default SupAppFormPicker
