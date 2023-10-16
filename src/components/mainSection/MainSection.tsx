import styles from "./MainSection.module.css"

import React, { useState } from "react"

type Props = {
	titleText?: string
}

const MainSection = ({ titleText = "5-star service at your fingertips." }: Props) => {
	return <h1 className={styles.title}>{titleText}</h1>
}

export default MainSection
