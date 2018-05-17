require 'digest'
module Compute
  module Checksum
    def compute_checksum(io)
      Digest::MD5.new.tap do |checksum|
        while chunk = io.read(5.megabytes)
          checksum << chunk
        end
        io.rewind
      end.base64digest
    end
  end
end

class Object
  include Compute::Checksum
end
