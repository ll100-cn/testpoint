Rails.application.routes.draw do
  root "nuxt_fallback/proxy#show"
  get "*path", to: "nuxt_fallback/proxy#show"
end
