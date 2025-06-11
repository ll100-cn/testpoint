// API Endpoints Collection (项目中所有的 Request endpoints)
//
// Links
// "/links"
// "/links", "/{id}"
// "/links", "/summary"
//
// Access Keys
// "/access_keys"
// "/access_keys", "/{id}"
//
// Account
// "/account"
//
// Session
// "/session"
//
// Synchronizations
// "/synchronizations", "/{id}"
//
// OAuth
// "/oauth/authorize"
//
// Connections
// "/connections"
// "/connections", "/{id}"
// "/connections", "/{id}", "/perform"
//
// GitHub
// "/connections/{connection_id}/github/user"
// "/connections/{connection_id}/github/user", "/configure"
// "/connections/{connection_id}/github/user", "/sync"
// "/connections/{connection_id}/github/starred_repos"
// "/connections/{connection_id}/github/lists"
//
// Bilibili
// "/connections/{connection_id}/bilibili/fav_folders"
// "/connections/{connection_id}/bilibili/fav_folders", "/{id}", "/move_resources"
// "/connections/{connection_id}/bilibili/fav_resources"
// "/connections/{connection_id}/bilibili/users/{user_id}/set_as_idle"
// "/connections/{connection_id}/bilibili/user/configure"
//
// Douban
// "/connections/{connection_id}/douban/focances"
// "/connections/{connection_id}/douban/user", "/configure"
//
// Karakeep
// "/connections/{connection_id}/karakeep/user"
// "/connections/{connection_id}/karakeep/user", "/configure"
// "/connections/{connection_id}/karakeep/user", "/sync"
// "/connections/{connection_id}/karakeep/bookmarks"
// "/connections/{connection_id}/karakeep/bookmarks", "/batch_update"
// "/connections/{connection_id}/karakeep/bookmarks", "/{id}"
//
// Pocket
// "/connections/{connection_id}/pocket/items"
// "/connections/{connection_id}/pocket/profile", "/configure"
// "/connections/{connection_id}/pocket/profile", "/sync"

export function matchEndpoint(queryKey: readonly unknown[], targetOptions: { endpoint: string[], interpolations?: Record<string, any> }): boolean {
  const { endpoint: targetEndpoint, interpolations } = targetOptions
  const pathStartIndex = queryKey.findIndex(item => !(typeof item === 'string' && item.startsWith('/')))
  const queryFullPath = queryKey.slice(0, pathStartIndex === -1 ? queryKey.length : pathStartIndex).join('')
  
  const targetRule = convertMatchRule(targetEndpoint, interpolations)
  
  const matchResult = matchQuery(queryFullPath, targetRule)
  if (!matchResult) return false
  
  const queryPath = matchResult.path
  const targetPath = extractTargetByRule(matchResult.rules, interpolations)
  
  return queryPath === targetPath ||
         queryPath.startsWith(targetPath) ||
         targetPath.startsWith(queryPath)
}

type PlaceholderInfo = {
  key: string
  type: 'number' | 'string'
}

type SegmentRule = {
  template: string
  placeholders: PlaceholderInfo[]
}

function convertMatchRule(targetEndpoint: string[], interpolations?: Record<string, any>): SegmentRule[] {
  return targetEndpoint.map(segment => {
    const placeholderMatches = [...segment.matchAll(/\{([^}]+)\}/g)]
    const placeholders: PlaceholderInfo[] = placeholderMatches.map(match => {
      const key = match[1]
      const interpolationValue = interpolations?.[key]
      const type = typeof interpolationValue === 'number' ? 'number' : 'string'
      return { key, type }
    })
    
    return {
      template: segment,
      placeholders
    }
  })
}

function matchQuery(queryPath: string, rule: SegmentRule[]) {
  let matchedLength = 0
  let currentPath = queryPath
  const matchedRules: SegmentRule[] = []
  
  for (const segment of rule) {
    const pattern = segment.placeholders.reduce((template: string, placeholder: PlaceholderInfo) => {
      const regex = placeholder.type === 'number' ? '\\d+' : '[^/]*'
      return template.replace(`{${placeholder.key}}`, `(${regex})`)
    }, segment.template)
    
    const regex = new RegExp(`^${pattern}`)
    const match = currentPath.match(regex)
    
    if (match) {
      matchedLength += match[0].length
      currentPath = currentPath.slice(match[0].length)
      matchedRules.push(segment)
    } else {
      break
    }
  }
  
  return matchedLength > 0 ? { path: queryPath.slice(0, matchedLength), rules:matchedRules } : null
}

function interpolateTemplate(template: string, placeholders: PlaceholderInfo[], interpolations?: Record<string, any>): string {
  return placeholders.reduce((result, placeholder) => {
    const value = interpolations?.[placeholder.key]
    return value !== undefined
      ? result.replace(`{${placeholder.key}}`, String(value))
      : result
  }, template)
}

function extractTargetByRule(matchedRules: SegmentRule[], interpolations?: Record<string, any>): string {
  const extractedSegments: string[] = []
  
  for (const ruleSegment of matchedRules) {
    const expandedSegment = interpolateTemplate(ruleSegment.template, ruleSegment.placeholders, interpolations)
    extractedSegments.push(expandedSegment)
  }
  
  return extractedSegments.join('')
}




