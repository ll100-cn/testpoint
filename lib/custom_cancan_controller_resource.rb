class CustomCancanControllerResource < CanCan::ControllerResource

  def authorization_action
    action = @params[:action].to_sym
    if parent?
      parent_authorization_action
    elsif @options[:authorization_action]
      instance_exec(action, &@options[:authorization_action]) || action
    else
      action
    end
  end
end
