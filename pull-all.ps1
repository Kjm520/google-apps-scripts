# pull-all.ps1
$scriptsDir = Join-Path $PSScriptRoot "scripts"

Get-ChildItem -Path $scriptsDir -Recurse -Filter ".clasp.json" | ForEach-Object {
    $dir = $_.DirectoryName
    Write-Host "Pulling: $dir"
    Push-Location $dir
    clasp pull
    Pop-Location
}
