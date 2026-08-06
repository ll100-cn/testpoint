require "rails_helper"

RSpec.describe NuxtFallback::ProxyController, type: :controller do
  describe "GET #show" do
    before do
      allow_any_instance_of(ActionDispatch::Request).to receive(:host).and_return("testpoint.localhost")
      allow_any_instance_of(ActionDispatch::Request).to receive(:fullpath).and_return("/projects/1/issues?state=open")
    end

    context "in production" do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
      end

      it "serves the prerendered fallback page" do
        static_fallback_path = Rails.public_path.join("200.html")

        expect(controller).to receive(:send_file)
          .with(static_fallback_path, disposition: "inline") { throw :proxy_done }

        catch(:proxy_done) { get :show }
      end
    end

    context "outside production" do
      before do
        allow(Rails.env).to receive(:production?).and_return(false)
      end

      it "proxies the current request to the configured Nuxt port" do
        expect(controller).to receive(:reverse_proxy).with(
          "http://testpoint.localhost:3001",
          path: "/projects/1/issues?state=open"
        ) { throw :proxy_done }

        catch(:proxy_done) { get :show }
      end
    end
  end
end
