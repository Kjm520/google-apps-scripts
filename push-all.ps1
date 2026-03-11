# push-all.ps1
Write-Host "WARNING: This will overwrite any changes made in the browser UI (Apps Script editor)."
$confirm = Read-Host "Continue? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Aborted."
    exit
}

$scriptsDir = Join-Path $PSScriptRoot "scripts"

Get-ChildItem -Path $scriptsDir -Recurse -Filter ".clasp.json" | ForEach-Object {
    $dir = $_.DirectoryName
    Write-Host "Pushing: $dir"
    Push-Location $dir
    clasp push
    Pop-Location
}