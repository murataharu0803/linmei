import { Archive, topics } from '@/api/types'
import {
  Button,
  Checkbox,
  Flex,
  Group,
  MultiSelect,
  RangeSlider,
  Text,
  TextInput,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import React, { useState } from 'react'

export interface Filter {
  titleQuery: string
  dateRange: [string | null, string | null]
  durationRange: [number, number]
  membershipFilter: boolean | null
  typeFilter: Archive['type'][]
  topicFilter: string[]
  subTopicFilter: string[]
  memberFilter: string[]
  customTagsFilter: string[]
}

type FilterProps = {
  subTopics: string[]
  members: string[]
  customTags: string[]
  allVideos: Archive[]
  setFilteredVideos: (videos: Archive[]) => void
}

const Filter: React.FC<FilterProps> = ({
  subTopics,
  members,
  customTags,
  allVideos,
  setFilteredVideos,
}) => {
  const [titleQuery, setTitleQuery] = useState('')
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null])
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 36000])
  const [membershipFilter, setMembershipFilter] = useState<boolean | null>(null)
  const toggleMembershipFilter = (
    setState: React.Dispatch<React.SetStateAction<boolean | null>>,
  ) => {
    setState(prev => {
      if (prev === null) return true
      if (prev === true) return false
      return null
    })
  }
  const [typeFilter, setTypeFilter] = useState<Archive['type'][]>(
    ['vod', 'shorts', 'video'],
  )
  const [topicFilter, setTopicFilter] = useState<string[]>([])
  const subTopicFilterData = topicFilter.length === 0
    ? subTopics.filter(Boolean)
    : subTopics.filter(st => topicFilter.some(t => st.startsWith(t + '/') || st === t))
      .filter(Boolean)
  const membersFilterData = [...members.filter(Boolean), '(非聯動)']
  const customTagsFilterData = [...customTags.filter(Boolean), '(沒有自訂標籤)']
  const [subTopicFilter, setSubTopicFilter] = useState<string[]>([])
  const [memberFilter, setMemberFilter] = useState<string[]>([])
  const [customTagsFilter, setCustomTagsFilter] = useState<string[]>([])

  const [currentFilter, setCurrentFilter] = useState<Filter>({
    titleQuery: '',
    dateRange: [null, null],
    durationRange: [0, 36000],
    membershipFilter: null,
    typeFilter: ['vod', 'shorts', 'video'],
    topicFilter: [],
    subTopicFilter: [],
    memberFilter: [],
    customTagsFilter: [],
  })

  const updateFiltering = () => {
    const filteredVideos = allVideos.filter(video => {
      const date = video.startAt || video.schedultesAt || video.publishedAt
      const matchesTitle = video.title.toLowerCase().includes(titleQuery.toLowerCase())
      const matchesDate = (!dateRange[0] && !dateRange[0] && !date) || (
        (!dateRange[0] || new Date(date) >= new Date(dateRange[0])) &&
        (!dateRange[1] || new Date(date) <= new Date(dateRange[1]))
      )
      const matchesDuration =
        video.duration >= durationRange[0] && video.duration <= durationRange[1]
      const matchesMembership = membershipFilter === null ||
        (membershipFilter ? video.isMembership : !video.isMembership)
      const matchesType = typeFilter.includes(video.type)
      const matchesTopic = topicFilter.length === 0 || topicFilter.includes(topics[video.topic])

      const matchesSubTopic =
        subTopicFilter.length === 0 ||
        subTopicFilter.includes(`${topics[video.topic]}/${video.subTopic}`) ||
        (!video.subTopic && subTopicFilter.includes('(未分類)'))

      const otherMembers = video.otherMembers || []
      const matchesMember = memberFilter.length === 0 || memberFilter.some(member =>
        otherMembers.includes(member) ||
        (otherMembers.length === 0 && memberFilter.includes('(非聯動)')),
      )

      const customTags = video.customTags || []
      const matchesCustomTags = customTagsFilter.length === 0 || customTagsFilter.some(tags =>
        customTags?.includes(tags) ||
        (customTags.length === 0 && customTagsFilter.includes('(沒有自訂標籤)')),
      )

      return matchesTitle && matchesDate && matchesDuration && matchesMembership &&
        matchesType && matchesTopic && matchesSubTopic && matchesMember && matchesCustomTags
    })

    setCurrentFilter({
      titleQuery,
      dateRange,
      durationRange,
      membershipFilter,
      typeFilter,
      topicFilter,
      subTopicFilter,
      memberFilter,
      customTagsFilter,
    })

    setFilteredVideos(filteredVideos)
  }

  const needsUpdate =
    titleQuery !== currentFilter.titleQuery ||
    dateRange[0] !== currentFilter.dateRange[0] ||
    dateRange[1] !== currentFilter.dateRange[1] ||
    durationRange[0] !== currentFilter.durationRange[0] ||
    durationRange[1] !== currentFilter.durationRange[1] ||
    membershipFilter !== currentFilter.membershipFilter ||
    typeFilter.join(',') !== currentFilter.typeFilter.join(',') ||
    topicFilter.join(',') !== currentFilter.topicFilter.join(',') ||
    subTopicFilter.join(',') !== currentFilter.subTopicFilter.join(',') ||
    memberFilter.join(',') !== currentFilter.memberFilter.join(',') ||
    customTagsFilter.join(',') !== currentFilter.customTagsFilter.join(',')

  return <Flex direction="column" gap="md" py="md">
    <Flex gap="md">
      <TextInput
        label="標題"
        placeholder="搜尋標題..."
        value={titleQuery}
        onChange={e => setTitleQuery(e.target.value)}
        flex={2}
      />
      <DatePickerInput
        label="日期範圍"
        type="range"
        value={dateRange}
        onChange={setDateRange}
        flex={1}
      />
    </Flex>
    <Flex gap="md" align="center">
      <Text size="sm">時長範圍 (秒)</Text>
      <RangeSlider
        value={durationRange}
        onChange={setDurationRange}
        step={5}
        min={0}
        max={36000}
        flex={1}
      />
      <Checkbox
        label="顯示會員限定"
        indeterminate={membershipFilter === null}
        checked={membershipFilter ?? false}
        onChange={() => toggleMembershipFilter(setMembershipFilter)}
      />
      <Checkbox.Group
        value={typeFilter}
        onChange={arr => setTypeFilter(arr as Archive['type'][])}
      >
        <Group>
          <Checkbox value="vod" label="直播" />
          <Checkbox value="shorts" label="Shorts" />
          <Checkbox value="video" label="影片" />
        </Group>
      </Checkbox.Group>
    </Flex>
    <Flex gap="md">
      <MultiSelect
        label="主題"
        placeholder={memberFilter.length === 0 ? '(全選)' : ''}
        data={Object.values(topics)}
        value={topicFilter}
        onChange={arr => setTopicFilter(arr)}
        clearable
        searchable
        flex={1}
      />
      <MultiSelect
        label="子主題"
        placeholder={subTopicFilter.length === 0 ? '(全選)' : ''}
        data={subTopicFilterData}
        value={subTopicFilter}
        onChange={setSubTopicFilter}
        clearable
        searchable
        flex={1}
      />
    </Flex>
    <Flex gap="md">
      <MultiSelect
        label="成員"
        placeholder={memberFilter.length === 0 ? '(全選)' : ''}
        data={membersFilterData}
        value={memberFilter}
        onChange={setMemberFilter}
        clearable
        searchable
        flex={1}
      />
      <MultiSelect
        label="自訂標籤"
        placeholder={customTagsFilter.length === 0 ? '(全選)' : ''}
        data={customTagsFilterData}
        value={customTagsFilter}
        onChange={setCustomTagsFilter}
        clearable
        searchable
        flex={1}
      />
    </Flex>
    <Button
      pos="absolute"
      right={0}
      top={0}
      onClick={updateFiltering}
      disabled={!needsUpdate}
    >
      更新篩選
    </Button>
  </Flex>
}

export default Filter
