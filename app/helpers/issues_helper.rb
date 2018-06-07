module IssuesHelper
  def issue_filters(options)
    params.permit(:state).merge(options)
  end
end