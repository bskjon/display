
$startTime = Get-Date
while ((Get-Process 'com.docker.proxy' -ErrorAction SilentlyContinue) -eq $Null) {
    $currentTime = Get-Date
    $waitedFor = NEW-TIMESPAN -Start $startTime -End $currentTime
    Write-Host "`rWaiting for docker to come online.. $waitedFor"  -NoNewline
    Start-Sleep -Seconds 1
}

docker buildx create --use
docker buildx build --push --platform=linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v6 -t bskjon/display-base:latest -f Dockerfile.base .
#docker push bskjon/display:latest

$endTime = Get-Date
$ranFor = NEW-TIMESPAN -Start $startTime -End $endTime
Write-Host "Done!"
Write-Host "Build duration: $ranFor" -ForegroundColor Yellow
Write-Host "..."

Start-Sleep -Seconds 120

& .\build.ps1