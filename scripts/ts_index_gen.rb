#!/usr/bin/env ruby

require "optparse"
require "pathname"

@options = { extensions: "ts,js" }
OptionParser.new do |opts|
  opts.banner = "Usage: #{$PROGRAM_NAME} [options] [folder1] [folder2] ..."

  opts.on("-e", "--ext [ts,js]") do |value|
    @options[:extensions] = value
  end

  opts.on("-h", "--help", "show usage") do |v|
    puts opts
    exit
  end
end.parse!

folders = ARGV.to_a

def gen_folder_index(path)
  print "#{path} ... "

  if !path.exist?
    puts "not exist"
    return
  end

  lines = []
  (path.glob("*.{#{@options[:extensions]}}") + path.glob("*/index.ts")).sort.each do |file|
    relative_path = file.relative_path_from(path)
    filename = relative_path.to_s
    extname = file.extname
    base = filename.chomp(extname)
    filename = base if [ ".ts", ".js" ].include?(extname)
    next if base == "index"

    if base.end_with?("/index")
      folder = base.chomp("/index")
      lines << %Q[export * as #{folder} from "./#{folder}"]
      next
    end

    content = file.read
    if content.match?(/export\s+(?!default)/)
      lines << %Q[export * from "./#{filename}"]
    end

    if content.match?(/export\s+default/)
      lines << %Q[export { default as #{base} } from "./#{filename}"]
    end

    if extname == ".vue"
      lines << %Q[export { default as #{base} } from "./#{filename}"]
    end
  end

  if lines.length > 0
    index_file = path.join("index.ts")

    IO.write(index_file, ([
      "// GENERATED BY #{File.basename($PROGRAM_NAME)}",
      ""
    ] + lines + [
      ""
    ]).join("\n"))

    puts "Generated"
  else
    puts "Skip"
  end
end

folders.each do |folder|
  path = Pathname.new(folder)
  gen_folder_index(path)
end
