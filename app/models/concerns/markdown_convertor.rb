require 'kramdown'
module MarkdownConvertor
  extend ActiveSupport::Concern

  def markdown_to_html(markdown, math_engine = "mathjax_node_png")
    return "" if markdown.blank?
    Kramdown::Document.new(
      markdown.strip,
      auto_ids: false,
      math_engine: math_engine,
      smart_quotes: %w[apos apos quot quot]
    ).to_html
  end
end
