/**
 * マスタ系のAPIを整形して返す
 */
const useTranslateKeyLabelToI18n = (keylabelList: KeyLabel[]): KeyLabel[] => {
  const { t } = useI18n()
  const results: KeyLabel[] = []
  for (const keylabel of keylabelList) {
    const label = keylabel.label
      ?.replace(new RegExp('万円', 'g'), t('tenThousandYen'))
      .replace(new RegExp('万km', 'g'), t('ten_thousand_km'))
      .replace(new RegExp('指定なし', 'g'), t('not_specified'))
    results.push({ key: keylabel.key, label: label })
  }
  return results
}

export { useTranslateKeyLabelToI18n }
