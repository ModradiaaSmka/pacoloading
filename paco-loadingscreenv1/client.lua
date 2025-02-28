
CreateThread(function()
    local startTime = GetGameTimer()
    local isLoading = true

    while isLoading do
        Wait(100)
        
        
        if not IsPlayerSwitchInProgress() then
            
            local currentTime = GetGameTimer()
            local timeDiff = currentTime - startTime
            local progress = math.min(timeDiff / 15000, 1.0) * 100 -
            
            
            SendNUIMessage({
                eventName = 'loadProgress',
                loadFraction = progress / 100
            })

            
            SendNUIMessage({
                eventName = 'statusText',
                status = 'Sunucuya bağlanılıyor...'
            })

            
            if progress >= 100 then
                isLoading = false
            end
        end
    end
end)


AddEventHandler('playerSpawned', function()
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end)

