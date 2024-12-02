
string input = File.ReadAllText("../../../input.txt");

/* 
    7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
    1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
    9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
    1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
    8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
    1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
*/

string[] lines = input.Split("\n");
List<string> safe = new List<string>();

foreach (string line in lines)
{
    string[] values = line.Split(" ");
    int[] intValues = Array.ConvertAll(values, int.Parse);
    
    bool isSafe = true;
    for (int i = 0; i < intValues.Length - 1; i++)
    {
        int diff = intValues[i + 1] - intValues[i];

        if (diff == 0 || Math.Abs(diff) > 3)
        {
            // if there is no change or the change is above the safe limit of 3
            isSafe = false;
            break;
        }

        if (i > 0)
        {
            int previousDiff = intValues[i] - intValues[i - 1];

            if ((previousDiff > 0 && diff < 0) || (previousDiff < 0 && diff > 0))
            {
                isSafe = false;
                break;
            }
        }
    }
    
    if (isSafe)
    {
        safe.Add(line);
    }

}

Console.WriteLine($"Part 1: {safe.Count}");

// part 2

safe = new List<string>();

bool IsSequenceSafe(int[] sequence)
{
    for (int i = 0; i < sequence.Length - 1; i++)
    {
        int diff = sequence[i + 1] - sequence[i];
        if (diff == 0 || Math.Abs(diff) > 3)
        {
            return false;
        }
        
        if (i > 0)
        {
            int previousDiff = sequence[i] - sequence[i - 1];
            if ((previousDiff > 0 && diff < 0) || (previousDiff < 0 && diff > 0)) 
                return false;
        }
    }
    return true;
}


foreach (string line in lines)
{
    string[] values = line.Split(" ");
    int[] intValues = Array.ConvertAll(values, int.Parse);

    if (IsSequenceSafe(intValues))
    {
        safe.Add(line); // its already safe
        continue;
    }

    // check if removing one level makes it safe
    bool dampenedSafe = false;
    for (int i = 0; i < intValues.Length; i++) // skip 1st and last
    {
        List<int> modifiedSequence = new List<int>(intValues);
        modifiedSequence.RemoveAt(i); // remove the level at i

        if (IsSequenceSafe(modifiedSequence.ToArray()))
        {
            dampenedSafe = true;
            break;
        }
    }

    if (dampenedSafe)
    {
        safe.Add(line);
    }
}

Console.WriteLine($"Part 2: {safe.Count}");