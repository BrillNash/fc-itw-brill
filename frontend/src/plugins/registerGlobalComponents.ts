import type { App } from 'vue'

// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Toaster } from '@/components/ui/sonner'
import { Label } from '@/components/ui/label'

// Icons
import { SquarePen, Trash2, Plus, CalendarIcon, Pencil } from 'lucide-vue-next'

export default function registerGlobalComponents(app: App) {
  app.component('Table', Table)
  app.component('TableBody', TableBody)
  app.component('TableCell', TableCell)
  app.component('TableHead', TableHead)
  app.component('TableHeader', TableHeader)
  app.component('TableRow', TableRow)

  app.component('Card', Card)
  app.component('CardContent', CardContent)
  app.component('CardDescription', CardDescription)
  app.component('CardHeader', CardHeader)
  app.component('CardTitle', CardTitle)
  app.component('CardFooter', CardFooter)
  
  app.component('FormField', FormField)
  app.component('FormItem', FormItem)
  app.component('FormLabel', FormLabel)
  app.component('FormControl', FormControl)
  app.component('FormMessage', FormMessage)

  app.component('Select', Select)
  app.component('SelectContent', SelectContent)
  app.component('SelectGroup', SelectGroup)
  app.component('SelectItem', SelectItem)
  app.component('SelectLabel', SelectLabel)
  app.component('SelectTrigger', SelectTrigger)
  app.component('SelectValue', SelectValue)

  app.component('Popover', Popover)
  app.component('PopoverContent', PopoverContent)
  app.component('PopoverTrigger', PopoverTrigger)

  app.component('Button', Button)
  app.component('Input', Input)
  app.component('Calendar', Calendar)
  app.component('Label', Label)
  app.component('Toaster', Toaster)

  // Register Lucide icons globally
  app.component('SquarePen', SquarePen)
  app.component('Trash2', Trash2)
  app.component('Plus', Plus)
  app.component('CalendarIcon', CalendarIcon)
  app.component('Pencil', Pencil)
}
