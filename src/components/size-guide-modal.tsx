"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
  productType?: string
}

interface SizeMeasurement {
  size: string
  shoulder?: number
  chest?: number
  waist?: number
  dressLength?: number
  armhole?: number
  sleeveLength?: number
  mori?: number
  choliLength?: number
  sleeveMori?: number
  biceps?: number
  elbow?: number
  lehengaLength?: number
  length?: number
  hips?: number
  crotch?: number
  pantLength?: number
  pantWaist?: string
  thigh?: number
  pantMori?: number
  upperChest?: number
}

const dressSizesCm: SizeMeasurement[] = [
  { size: "S", shoulder: 36, chest: 81, waist: 65, dressLength: 90, armhole: 40, sleeveLength: 57 },
  { size: "M", shoulder: 38, chest: 86, waist: 70, dressLength: 95, armhole: 42, sleeveLength: 58 },
  { size: "L", shoulder: 40, chest: 91, waist: 75, dressLength: 100, armhole: 44, sleeveLength: 60 },
  { size: "XL", shoulder: 42, chest: 96, waist: 80, dressLength: 105, armhole: 46, sleeveLength: 62 },
  { size: "XXL", shoulder: 44, chest: 101, waist: 85, dressLength: 110, armhole: 48, sleeveLength: 64 },
]

const dressSizesInch: SizeMeasurement[] = [
  { size: "S", shoulder: 14, chest: 32, waist: 25.5, dressLength: 35.5, armhole: 15.7, sleeveLength: 22.5, mori: 29.5 },
  { size: "M", shoulder: 15, chest: 34, waist: 27.5, dressLength: 37.5, armhole: 16.5, sleeveLength: 23, mori: 31.5 },
  {
    size: "L",
    shoulder: 15.7,
    chest: 36,
    waist: 29.5,
    dressLength: 39.5,
    armhole: 17.3,
    sleeveLength: 23.5,
    mori: 33.5,
  },
  {
    size: "XL",
    shoulder: 16.5,
    chest: 38,
    waist: 31.5,
    dressLength: 41.5,
    armhole: 18,
    sleeveLength: 24.5,
    mori: 35.5,
  },
  { size: "XXL", shoulder: 17.3, chest: 40, waist: 33.5, dressLength: 43.5, armhole: 19, sleeveLength: 25, mori: 37.5 },
]

const lehengaSizesCm: SizeMeasurement[] = [
  {
    size: "S",
    shoulder: 36,
    chest: 81,
    waist: 65,
    choliLength: 35,
    sleeveLength: 57,
    sleeveMori: 22,
    armhole: 40,
    biceps: 27,
    elbow: 25,
    lehengaLength: 105,
  },
  {
    size: "M",
    shoulder: 38,
    chest: 86,
    waist: 70,
    choliLength: 37,
    sleeveLength: 58,
    sleeveMori: 24,
    armhole: 42,
    biceps: 29,
    elbow: 27,
    lehengaLength: 110,
  },
  {
    size: "L",
    shoulder: 40,
    chest: 91,
    waist: 75,
    choliLength: 39,
    sleeveLength: 60,
    sleeveMori: 26,
    armhole: 44,
    biceps: 31,
    elbow: 29,
    lehengaLength: 115,
  },
  {
    size: "XL",
    shoulder: 42,
    chest: 96,
    waist: 80,
    choliLength: 41,
    sleeveLength: 62,
    sleeveMori: 28,
    armhole: 46,
    biceps: 33,
    elbow: 31,
    lehengaLength: 120,
  },
  {
    size: "XXL",
    shoulder: 44,
    chest: 101,
    waist: 85,
    choliLength: 43,
    sleeveLength: 64,
    sleeveMori: 30,
    armhole: 48,
    biceps: 35,
    elbow: 33,
    lehengaLength: 125,
  },
]

const lehengaSizesInch: SizeMeasurement[] = [
  {
    size: "S",
    shoulder: 14,
    chest: 32,
    waist: 25.5,
    choliLength: 13.5,
    sleeveLength: 22.5,
    sleeveMori: 8.5,
    armhole: 15.7,
    biceps: 10.5,
    elbow: 9.8,
    lehengaLength: 41.5,
  },
  {
    size: "M",
    shoulder: 15,
    chest: 34,
    waist: 27.5,
    choliLength: 14.5,
    sleeveLength: 23,
    sleeveMori: 9.5,
    armhole: 16.5,
    biceps: 11.4,
    elbow: 10.5,
    lehengaLength: 43.5,
  },
  {
    size: "L",
    shoulder: 15.7,
    chest: 36,
    waist: 29.5,
    choliLength: 15.5,
    sleeveLength: 23.5,
    sleeveMori: 10,
    armhole: 17.3,
    biceps: 12.2,
    elbow: 11.4,
    lehengaLength: 45.5,
  },
  {
    size: "XL",
    shoulder: 16.5,
    chest: 38,
    waist: 31.5,
    choliLength: 16,
    sleeveLength: 24.5,
    sleeveMori: 11,
    armhole: 18,
    biceps: 13,
    elbow: 12.2,
    lehengaLength: 47.5,
  },
  {
    size: "XXL",
    shoulder: 17.3,
    chest: 40,
    waist: 33.5,
    choliLength: 17,
    sleeveLength: 25,
    sleeveMori: 11.8,
    armhole: 19,
    biceps: 13.8,
    elbow: 13,
    lehengaLength: 49.5,
  },
]

const jumpsuitSizesCm: SizeMeasurement[] = [
  { size: "S", length: 140, shoulder: 38, waist: 65, sleeveLength: 57, armhole: 40, hips: 86, crotch: 27 },
  { size: "M", length: 142, shoulder: 38, waist: 70, sleeveLength: 58, armhole: 42, hips: 91, crotch: 28 },
  { size: "L", length: 145, shoulder: 40, waist: 75, sleeveLength: 60, armhole: 44, hips: 98, crotch: 29 },
  { size: "XL", length: 148, shoulder: 42, waist: 80, sleeveLength: 62, armhole: 46, hips: 101, crotch: 30 },
  { size: "XXL", length: 150, shoulder: 44, waist: 85, sleeveLength: 64, armhole: 48, hips: 106, crotch: 31 },
]

const jumpsuitSizesInch: SizeMeasurement[] = [
  { size: "S", length: 55, shoulder: 14, waist: 25.5, sleeveLength: 22.5, armhole: 15.7, hips: 34, crotch: 10.5 },
  { size: "M", length: 55, shoulder: 15, waist: 27.5, sleeveLength: 23, armhole: 16.5, hips: 36, crotch: 11 },
  { size: "L", length: 57, shoulder: 15.7, waist: 29.5, sleeveLength: 23.5, armhole: 17.3, hips: 38, crotch: 11.5 },
  { size: "XL", length: 58.5, shoulder: 16.5, waist: 31.5, sleeveLength: 24.5, armhole: 18, hips: 40, crotch: 12 },
  { size: "XXL", length: 59, shoulder: 17.3, waist: 33.5, sleeveLength: 25, armhole: 19, hips: 42, crotch: 12.5 },
]

const kurtiSizesCm: SizeMeasurement[] = [
  {
    size: "S",
    shoulder: 36,
    chest: 89,
    waist: 71,
    sleeveLength: 53,
    sleeveMori: 25,
    armhole: 40,
    upperChest: 91,
    biceps: 28,
    elbow: 27,
  },
  {
    size: "M",
    shoulder: 38,
    chest: 91,
    waist: 76,
    sleeveLength: 55,
    sleeveMori: 28,
    armhole: 42,
    upperChest: 96,
    biceps: 30,
    elbow: 28,
  },
  {
    size: "L",
    shoulder: 40,
    chest: 98,
    waist: 81,
    sleeveLength: 57,
    sleeveMori: 27,
    armhole: 44,
    upperChest: 101,
    biceps: 32,
    elbow: 29,
  },
  {
    size: "XL",
    shoulder: 42,
    chest: 101,
    waist: 86,
    sleeveLength: 59,
    sleeveMori: 28,
    armhole: 46,
    upperChest: 106,
    biceps: 34,
    elbow: 30,
  },
  {
    size: "XXL",
    shoulder: 44,
    chest: 106,
    waist: 91,
    sleeveLength: 61,
    sleeveMori: 29,
    armhole: 48,
    upperChest: 111,
    biceps: 36,
    elbow: 31,
  },
]

const kurtiSizesInch: SizeMeasurement[] = [
  {
    size: "S",
    shoulder: 14,
    chest: 34,
    waist: 28,
    sleeveLength: 21,
    sleeveMori: 10,
    armhole: 15.7,
    upperChest: 36,
    biceps: 11,
    elbow: 10.5,
  },
  {
    size: "M",
    shoulder: 15,
    chest: 36,
    waist: 30,
    sleeveLength: 21.5,
    sleeveMori: 11,
    armhole: 16.5,
    upperChest: 38,
    biceps: 12,
    elbow: 11,
  },
  {
    size: "L",
    shoulder: 15.7,
    chest: 38,
    waist: 32,
    sleeveLength: 22.5,
    sleeveMori: 11,
    armhole: 17.3,
    upperChest: 40,
    biceps: 12.5,
    elbow: 11.5,
  },
  {
    size: "XL",
    shoulder: 16.5,
    chest: 40,
    waist: 34,
    sleeveLength: 23,
    sleeveMori: 11.5,
    armhole: 18,
    upperChest: 42,
    biceps: 13.5,
    elbow: 12,
  },
  {
    size: "XXL",
    shoulder: 17.3,
    chest: 42,
    waist: 36,
    sleeveLength: 24,
    sleeveMori: 12,
    armhole: 19,
    upperChest: 44,
    biceps: 14,
    elbow: 12.5,
  },
]

const pantSizesCm: SizeMeasurement[] = [
  { size: "S", pantLength: 98, pantWaist: "71-76", thigh: 56, crotch: 26, pantMori: 36 },
  { size: "M", pantLength: 100, pantWaist: "76-81", thigh: 58, crotch: 27, pantMori: 38 },
  { size: "L", pantLength: 102, pantWaist: "81-86", thigh: 60, crotch: 28, pantMori: 40 },
  { size: "XL", pantLength: 104, pantWaist: "88-91", thigh: 62, crotch: 29, pantMori: 42 },
  { size: "XXL", pantLength: 106, pantWaist: "91-96", thigh: 64, crotch: 30, pantMori: 44 },
]

const pantSizesInch: SizeMeasurement[] = [
  { size: "S", pantLength: 38.5, pantWaist: "28-30", thigh: 22, crotch: 10.2, pantMori: 14 },
  { size: "M", pantLength: 39.5, pantWaist: "30-32", thigh: 23, crotch: 10.6, pantMori: 15 },
  { size: "L", pantLength: 40, pantWaist: "32-34", thigh: 24, crotch: 11, pantMori: 15.7 },
  { size: "XL", pantLength: 41, pantWaist: "34-36", thigh: 24.5, crotch: 11.4, pantMori: 16.5 },
  { size: "XXL", pantLength: 42, pantWaist: "36-38", thigh: 25, crotch: 11.8, pantMori: 17.3 },
]

export default function SizeGuideModal({ isOpen = true, onClose, productType = "dress" }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"cm" | "inch">("cm")
  const [activeTab, setActiveTab] = useState<"dress" | "lehenga-choli" | "jumpsuit" | "kurti" | "pant">(() => {
    const lowerCaseProductType = productType.toLowerCase()
    if (
      lowerCaseProductType.includes("lehenga") ||
      lowerCaseProductType.includes("choli") ||
      lowerCaseProductType.includes("sharara")
    ) {
      return "lehenga-choli"
    }
    if (lowerCaseProductType.includes("jumpsuit")) {
      return "jumpsuit"
    }
    if (lowerCaseProductType.includes("kurti")) {
      return "kurti"
    }
    if (lowerCaseProductType.includes("pant") || lowerCaseProductType.includes("trouser")) {
      return "pant"
    }
    return "dress"
  })

  if (!isOpen) return null

  const getDressData = () => {
    return unit === "cm" ? dressSizesCm : dressSizesInch
  }

  const getLehengaData = () => {
    return unit === "cm" ? lehengaSizesCm : lehengaSizesInch
  }

  const getJumpsuitData = () => {
    return unit === "cm" ? jumpsuitSizesCm : jumpsuitSizesInch
  }

  const getKurtiData = () => {
    return unit === "cm" ? kurtiSizesCm : kurtiSizesInch
  }

  const getPantData = () => {
    return unit === "cm" ? pantSizesCm : pantSizesInch
  }

  const renderDressTable = () => {
    const data = getDressData()
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Size</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Shoulder</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Chest</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Waist</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Dress Length</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Armhole</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Sleeve Length</th>
              {unit === "inch" && (
                <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Mori</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                <td className="border border-gray-300 px-3 py-2">{row.shoulder}</td>
                <td className="border border-gray-300 px-3 py-2">{row.chest}</td>
                <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                <td className="border border-gray-300 px-3 py-2">{row.dressLength}</td>
                <td className="border border-gray-300 px-3 py-2">{row.armhole}</td>
                <td className="border border-gray-300 px-3 py-2">{row.sleeveLength}</td>
                {unit === "inch" && row.mori && <td className="border border-gray-300 px-3 py-2">{row.mori}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderLehengaTable = () => {
    const data = getLehengaData()
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Size</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Shoulder</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Chest</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Waist</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Choli Length</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Sleeve Length</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Sleeve Mori</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Armhole</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Biceps</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Elbow</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Lehenga Length</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-2 py-2 font-medium">{row.size}</td>
                <td className="border border-gray-300 px-2 py-2">{row.shoulder}</td>
                <td className="border border-gray-300 px-2 py-2">{row.chest}</td>
                <td className="border border-gray-300 px-2 py-2">{row.waist}</td>
                <td className="border border-gray-300 px-2 py-2">{row.choliLength}</td>
                <td className="border border-gray-300 px-2 py-2">{row.sleeveLength}</td>
                <td className="border border-gray-300 px-2 py-2">{row.sleeveMori}</td>
                <td className="border border-gray-300 px-2 py-2">{row.armhole}</td>
                <td className="border border-gray-300 px-2 py-2">{row.biceps}</td>
                <td className="border border-gray-300 px-2 py-2">{row.elbow}</td>
                <td className="border border-gray-300 px-2 py-2">{row.lehengaLength}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderJumpsuitTable = () => {
    const data = getJumpsuitData()
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Size</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Length</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Shoulder</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Waist</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Sleeve Length</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Armhole</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Hips</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Crotch</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                <td className="border border-gray-300 px-3 py-2">{row.length}</td>
                <td className="border border-gray-300 px-3 py-2">{row.shoulder}</td>
                <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                <td className="border border-gray-300 px-3 py-2">{row.sleeveLength}</td>
                <td className="border border-gray-300 px-3 py-2">{row.armhole}</td>
                <td className="border border-gray-300 px-3 py-2">{row.hips}</td>
                <td className="border border-gray-300 px-3 py-2">{row.crotch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderKurtiTable = () => {
    const data = getKurtiData()
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Size</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Shoulder</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Chest</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Waist</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Sleeve Length</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Sleeve Mori</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Armhole</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Upper Chest</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Biceps</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-medium text-gray-900">Elbow</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-2 py-2 font-medium">{row.size}</td>
                <td className="border border-gray-300 px-2 py-2">{row.shoulder}</td>
                <td className="border border-gray-300 px-2 py-2">{row.chest}</td>
                <td className="border border-gray-300 px-2 py-2">{row.waist}</td>
                <td className="border border-gray-300 px-2 py-2">{row.sleeveLength}</td>
                <td className="border border-gray-300 px-2 py-2">{row.sleeveMori}</td>
                <td className="border border-gray-300 px-2 py-2">{row.armhole}</td>
                <td className="border border-gray-300 px-2 py-2">{row.upperChest}</td>
                <td className="border border-gray-300 px-2 py-2">{row.biceps}</td>
                <td className="border border-gray-300 px-2 py-2">{row.elbow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderPantTable = () => {
    const data = getPantData()
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Size</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Pant Length</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Pant Waist</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Thigh</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Crotch</th>
              <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-900">Pant Mori</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                <td className="border border-gray-300 px-3 py-2">{row.pantLength}</td>
                <td className="border border-gray-300 px-3 py-2">{row.pantWaist}</td>
                <td className="border border-gray-300 px-3 py-2">{row.thigh}</td>
                <td className="border border-gray-300 px-3 py-2">{row.crotch}</td>
                <td className="border border-gray-300 px-3 py-2">{row.pantMori}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close size guide"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab("dress")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "dress" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Dress
          </button>
          <button
            onClick={() => setActiveTab("lehenga-choli")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "lehenga-choli" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Lehenga Choli
          </button>
          <button
            onClick={() => setActiveTab("jumpsuit")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "jumpsuit" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Jumpsuit
          </button>
          <button
            onClick={() => setActiveTab("kurti")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "kurti" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Kurti
          </button>
          <button
            onClick={() => setActiveTab("pant")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "pant" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Pant
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="mb-6 flex justify-end">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setUnit("cm")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                unit === "cm" ? "bg-gray-800 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Cm
            </button>
            <button
              onClick={() => setUnit("inch")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                unit === "inch" ? "bg-gray-800 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Inch
            </button>
          </div>
        </div>

        {/* Size Chart */}
        <div className="mb-6">
          {activeTab === "dress" && renderDressTable()}
          {activeTab === "lehenga-choli" && renderLehengaTable()}
          {activeTab === "jumpsuit" && renderJumpsuitTable()}
          {activeTab === "kurti" && renderKurtiTable()}
          {activeTab === "pant" && renderPantTable()}
        </div>

        {/* Measurement Guide */}
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">How to Measure:</h3>
          <div className="grid gap-2 text-sm text-blue-800 md:grid-cols-2">
            <div>
              <strong>Chest:</strong> Measure around the fullest part of your chest
            </div>
            <div>
              <strong>Waist:</strong> Measure around your natural waistline
            </div>
            <div>
              <strong>Shoulder:</strong> Measure from shoulder point to shoulder point
            </div>
            <div>
              <strong>Sleeve Length:</strong> Measure from shoulder to wrist
            </div>
            {(activeTab === "lehenga-choli" || activeTab === "kurti") && (
              <>
                <div>
                  <strong>Armhole:</strong> Measure around the fullest part of your armhole
                </div>
                <div>
                  <strong>Sleeve Mori:</strong> Measure around the opening of the sleeve
                </div>
              </>
            )}
            {activeTab === "lehenga-choli" && (
              <>
                <div>
                  <strong>Choli Length:</strong> Measure from shoulder to desired choli length
                </div>
                <div>
                  <strong>Lehenga Length:</strong> Measure from waist to desired skirt length
                </div>
                <div>
                  <strong>Biceps:</strong> Measure around the fullest part of your upper arm
                </div>
                <div>
                  <strong>Elbow:</strong> Measure around your elbow
                </div>
              </>
            )}
            {activeTab === "jumpsuit" && (
              <>
                <div>
                  <strong>Length:</strong> Measure from the highest point of your shoulder to the hem
                </div>
                <div>
                  <strong>Hips:</strong> Measure around the fullest part of your hips
                </div>
                <div>
                  <strong>Crotch:</strong> Measure from the front waist to the back waist through the legs
                </div>
              </>
            )}
            {activeTab === "kurti" && (
              <>
                <div>
                  <strong>Upper Chest:</strong> Measure around your upper chest, just below the armpits
                </div>
                <div>
                  <strong>Biceps:</strong> Measure around the fullest part of your upper arm
                </div>
                <div>
                  <strong>Elbow:</strong> Measure around your elbow
                </div>
              </>
            )}
            {activeTab === "pant" && (
              <>
                <div>
                  <strong>Pant Length:</strong> Measure from your waist to the desired hem length
                </div>
                <div>
                  <strong>Thigh:</strong> Measure around the fullest part of your thigh
                </div>
                <div>
                  <strong>Crotch:</strong> Measure from the front waist to the back waist through the legs
                </div>
                <div>
                  <strong>Pant Mori:</strong> Measure around the bottom opening of the pant leg
                </div>
              </>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
