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
  path.glob("*.{#{@options[:extensions]}}").each do |file|
    filename = file.basename
    extname = file.extname
    basename = File.basename(filename, extname)
    filename = basename if [ ".ts", ".js" ].include?(extname)
    next if basename == "index"

    content = file.read
    if content.match?(/export\s+(?!default)/)
      lines << %Q[export * from "./#{filename}"]
    end

    if content.match?(/export\s+default/)
      lines << %Q[export { default as #{basename} } from "./#{filename}"]
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