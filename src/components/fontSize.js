import { Dimensions } from "react-native"
import React from "react"

const { height, width } = Dimensions.get('window')

let mT = width.toFixed(0) * 0.065
let t = width.toFixed(0) * 0.05
let sT = width.toFixed(0) * 0.04
let b = width.toFixed(0) * 0.035
let wmax = width.toFixed(0) > 400 ? 40 : width.toFixed(0) >= 360 ? 30 : width * 0.10

export const fontSize = { mainTitle: mT, title: t, subtitle: sT, body: b, button: b }