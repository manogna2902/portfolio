@echo off
set ESBUILD="C:\Users\manog\AppData\Local\Programs\Antigravity IDE\resources\app\node_modules\@esbuild\win32-x64\esbuild.exe"
if exist %ESBUILD% (
    %ESBUILD% src/main.jsx --bundle --outfile=dist/bundle.js --format=esm --external:react --external:react-dom --external:react-dom/client --external:@supabase/supabase-js
    echo Build complete!
) else (
    echo Esbuild not found at default location. Running npm run build...
    npm run build
)

