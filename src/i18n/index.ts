import { reactive, computed } from 'vue'
import { translations, type Locale } from './translations'

const state = reactive({
  locale: (localStorage.getItem('locale') as Locale) || 'EN',
})

export function useI18n() {
  const t = (key: string): string => {
    return translations[state.locale]?.[key] ?? key
  }

  const locale = computed(() => state.locale)

  function setLocale(l: Locale) {
    state.locale = l
    localStorage.setItem('locale', l)
  }

  return { t, locale, setLocale }
}

export function toggleLocale() {
  const next: Locale = state.locale === 'EN' ? 'KH' : 'EN'
  state.locale = next
  localStorage.setItem('locale', next)
}
