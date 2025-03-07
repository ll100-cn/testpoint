#!/bin/bash

# 在所有包含特定行的 Vue 文件中添加新的导入和代码行
find app/javascript/frontend -type f -name "*.vue" -exec grep -l -E "const proxy = getCurrentInstance\(\)!\.proxy( as any|!)" {} \; | while read -r file; do
  # 添加导入语句（如果不存在）
  if ! grep -q "import useRequestList from '@bbb/useRequestList'" "$file"; then
    awk '/import.*from/{if(!p){print;print "import useRequestList from '\''@bbb/useRequestList'\''";p=1}else{print}}!/import.*from/{print}' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
  fi

  # 在特定行后添加新行（如果不存在）
  if ! grep -q "const reqs = useRequestList()" "$file"; then
    awk '/const proxy = getCurrentInstance\(\)!\.proxy[! ]/{print;print "const reqs = useRequestList()";next}1' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
  fi
done
