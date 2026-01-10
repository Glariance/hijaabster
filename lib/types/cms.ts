// CMS Data Types based on the API response structure

export interface CmsPageMeta {
  title: string
  keywords: string
  description: string
}

export interface CmsField {
  type: string
  value: string
  url?: string
}

export interface CmsRepeaterItem {
  [fieldName: string]: CmsField
}

export interface CmsSection {
  id: number
  name: string
  type: 'repeater' | 'single'
  sort_order: number
  items?: CmsRepeaterItem[] // For repeater type
  fields?: { [fieldName: string]: CmsField } // For single type
}

export interface CmsPageData {
  id: number
  title: string
  slug: string
  meta: CmsPageMeta
  sections: CmsSection[]
}

export interface CmsPageResponse {
  page: CmsPageData
}

// Banner-specific types for Hero Slider
export interface BannerItemData {
  "Title"?: CmsField
  "Description"?: CmsField
  "Button Text"?: CmsField
  "Button Link"?: CmsField
  "Banner Image"?: CmsField
  [key: string]: CmsField | undefined
}

export interface HeroSliderSlide {
  id: number
  image: string
  position: string
  title: string
  description: string
  link: string
  buttonText: string
}

