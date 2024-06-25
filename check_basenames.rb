def check_basenames_for_invalid_characters(root_dir)
  invalid_basenames = []

  Dir.glob("#{root_dir}/**/*").each do |path|
    basename = File.basename(path)

    if basename =~ /[\/\:\*\?\"\<\>\|]/
      invalid_basenames << basename
      puts "Invalid basename: #{basename}"
    end
  end

  if invalid_basenames.empty?
    puts "All basenames valid"
  else
    puts "Found invalid basenames!"
    puts invalid_basenames.join("\n")
    exit 1
  end
end

root_dir = "."
check_basenames_for_invalid_characters(root_dir)

