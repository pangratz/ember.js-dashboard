APPNAME = 'ember-skeleton'

require 'colored'
require 'rake-pipeline'

desc "Build #{APPNAME}"
task :build do
  Rake::Pipeline::Project.new('Assetfile').invoke
end

desc "Deploy #{APPNAME} to gh-pages branch"
task :deploy do
  `rm -rf build`
  `mkdir build`
  origin = `git config remote.origin.url`.chomp
  Rake::Task["build"].invoke
  Dir.chdir "build" do
    `git init`
    `git remote add origin #{origin}`
    `git checkout -b gh-pages`
    `cp ../index.html .`
    `cp -r ../assets .`
    `git add .`
    `git commit -m 'Site updated at #{Time.now.utc}'`
    `git push -f origin gh-pages`
  end
end

desc "Run tests with PhantomJS"
task :test => :build do
  unless system("which phantomjs > /dev/null 2>&1")
    abort "PhantomJS is not installed. Download from http://phantomjs.org/"
  end

  cmd = "phantomjs tests/qunit/run-qunit.js \"file://#{File.dirname(__FILE__)}/tests/index.html\""

  # Run the tests
  puts "Running #{APPNAME} tests"
  success = system(cmd)

  if success
    puts "Tests Passed".green
  else
    puts "Tests Failed".red
    exit(1)
  end
end
