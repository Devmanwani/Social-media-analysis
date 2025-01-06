import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PostTypeSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange} >
      <SelectTrigger className="w-[180px]" >
        <SelectValue placeholder="Select post type" />
      </SelectTrigger>
      < SelectContent >
        <SelectItem value="carousel" > Carousel </SelectItem>
        < SelectItem value="static" > Static </SelectItem>
        < SelectItem value="reels" > Reels </SelectItem>
      </SelectContent>
    </Select>
  )
}
