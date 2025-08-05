import json

# Load faculty data
with open('faculties.json', 'r') as file:
    data = json.load(file)

print(f"📊 KATHMANDU UNIVERSITY FACULTY STATISTICS")
print(f"=" * 50)
print(f"Total Faculty Members: {len(data)}")

# Count by schools
schools = {}
for faculty in data:
    school = faculty['school']
    schools[school] = schools.get(school, 0) + 1

print(f"\n🏫 SCHOOLS ({len(schools)} total):")
for school, count in sorted(schools.items()):
    print(f"  • {school}: {count} faculty")

# Count by departments (top 15)
departments = {}
for faculty in data:
    dept = faculty['department']
    departments[dept] = departments.get(dept, 0) + 1

print(f"\n🏢 TOP DEPARTMENTS:")
sorted_depts = sorted(departments.items(), key=lambda x: x[1], reverse=True)
for dept, count in sorted_depts[:15]:
    print(f"  • {dept}: {count} faculty")

# Count by positions
positions = {}
for faculty in data:
    position = faculty['position']
    positions[position] = positions.get(position, 0) + 1

print(f"\n👨‍🏫 ACADEMIC POSITIONS:")
for position, count in sorted(positions.items(), key=lambda x: x[1], reverse=True):
    print(f"  • {position}: {count} faculty")

print(f"\n" + "=" * 50)
