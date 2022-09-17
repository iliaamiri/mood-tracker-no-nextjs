using BackendMoodTrackerApi.Models;
using BackendMoodTrackerApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendMoodTrackerApi.Controllers;

[ApiController]
[Route("/api/moods/[action]")]
public class MoodController : ControllerBase
{
    private readonly IMoodRepository _moodRepository;

    public MoodController(IMoodRepository moodRepository)
    {
        _moodRepository = moodRepository;
    }
    
    [HttpGet]
    [Route("/api/moods/{moodId}")]
    public async Task<IActionResult> GetOne(int moodId)
    {
        try
        {
            var mood = await _moodRepository.GetOne(moodId);
            if (mood == null)
            {
                throw new Exception("Mood does not exist!");
            }
            return Ok(mood);
        }
        catch (Exception error)
        {
            return Problem(detail: error.Message, statusCode: 404);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Add(AddMoodPayloadDTO addMoodPayloadDto)
    {
        try
        {
            var addedMood = await _moodRepository.Add(addMoodPayloadDto);
            return Ok(addedMood);
        }
        catch (Exception error)
        {
            return Problem(detail: error.Message, statusCode: 400);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Delete(RemoveMoodPayloadDTO removeMoodPayloadDto)
    {
        try
        {
            await _moodRepository.Remove(removeMoodPayloadDto.MoodId);
            return Ok();
        }
        catch (Exception error)
        {
            return Problem(detail: error.Message, statusCode: 400);
        }
    }

    [HttpGet]
    [Route("/api/moods/")]
    public async Task<IActionResult> Index()
    {
        try
        {
            var allMoods = await _moodRepository.GetAll();
            return Ok(allMoods);
        }
        catch (Exception error)
        {
            return Problem(detail: error.Message, statusCode: 400);
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> Update(UpdateMoodPayloadDTO updateMoodPayloadDto)
    {
        try
        {
            var updatedMood = await _moodRepository.Update(updateMoodPayloadDto);
            return Ok(updatedMood);
        }
        catch (Exception error)
        {
            return Problem(detail: error.Message, statusCode: 400);
        }
    }
}